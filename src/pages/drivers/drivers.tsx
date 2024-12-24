import { useMemo, useState } from "react"
import { format } from "date-fns"
import { RenderIf, Table, TableAction } from "@/components/core"
import { FetchedDriversCountStatusType, FetchedDriverType } from "@/types/drivers"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useGetDrivers } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { updateQueryParams } from "@/hooks/usePaginationParams"

export const DriversPage = () => {
    const [itemsPerPage] = useState(15)
    const [driverFilters, setDriverFilters] = useState({
        page: 1
    })
    const { data: driversCountStatus } = useGetDrivers<FetchedDriversCountStatusType>({ component: "count-status" })
    const { data: driversCount, isLoading: isLoadingDriversCount } = useGetDrivers<{ total: number; }>({ component: "count" })
    const { data: drivers, isLoading: isLoadingDrivers } = useGetDrivers<FetchedDriverType[]>({ ...driverFilters, item_per_page: itemsPerPage.toString() })
    const driverCards = useMemo(() => {
        return [
            { label: "All Drivers", value: driversCountStatus?.total || 0, percentage: "+20.1%" },
            { label: "Pending Drivers", value: driversCountStatus?.pending || 0, percentage: "+20.1%" },
            { label: "Registered Drivers", value: driversCountStatus?.registered || 0, percentage: "+20.1%" },
            { label: "Verified Drivers", value: driversCountStatus?.verified || 0, percentage: "+20.1%" },
        ]
    },[driversCountStatus?.pending, driversCountStatus?.registered, driversCountStatus?.total, driversCountStatus?.verified])
    const columns = [
        {
            header: () => "Reg. Date",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedDriverType
                return (
                    <div className="text-sm lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
                )
            }
        },
        {
            header: () => "Name",
            accessorKey: "fullName",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedDriverType
                return (
                    <div className="text-sm capitalize whitespace-nowrap">{item?.first_name || "-"} {item?.last_name || "-"}</div>
                )
            }
        },
        {
            header: () => "Email",
            accessorKey: "email",
        },
        {
            header: () => "Phone Number",
            accessorKey: "phone_number",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedDriverType
                return (
                    <div className="text-sm capitalize whitespace-nowrap">{item?.phone_number || "-"}</div>
                )
            }
        }
    ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setDriverFilters((prev) => ({ ...prev, page }))
        updateQueryParams(driverFilters)
    };
    
    return (
        <div className="p-4 md:p-6 view-page-container overflow-y-scroll">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        driverCards.map((item, id) =>
                            <div className="grid gap-2 p-6 rounded-lg border border-grey-dark-3" key={id}>
                                <div className="flex items-center justify-between gap-2">
                                    <h1 className="text-sm font-medium text-green-0">{item?.label}</h1>
                                    <Icon icon="mdi:steering" className="size-4 text-grey-dark-2" />
                                </div>
                                <div className="grid">
                                    <h2 className="text-2xl font-bold text-green-0">{item?.value}</h2>
                                    <p className="text-xs text-grey-dark-2">{item?.percentage} from last month</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="grid gap-5 p-4 rounded-lg border border-grey-dark-3">
                    <div className="flex items-center justify-between gap-2">
                        <h1 className="font-bold text-xl text-green-0">All Drivers</h1>
                        <div className="flex items-center justify-end gap-2">
                            <TableAction theme="tertiary">
                                <Icon icon="lucide:upload" className="size-4 text-grey-dark-2" />
                                Export
                            </TableAction>
                            <TableAction theme="primary">
                                <Icon icon="lucide:filter" className="size-4" />
                                Filter
                            </TableAction>
                        </div>
                    </div>
                    <RenderIf condition={!isLoadingDrivers && !isLoadingDriversCount}>
                        <Table
                            columns={columns}
                            data={drivers ?? []}
                            perPage={itemsPerPage}
                            page={driverFilters.page}
                            onPageChange={handlePageChange}
                            totalCount={driversCount?.total}
                            emptyStateText="We couldn't find any driver on the system."
                        />
                    </RenderIf>
                    <RenderIf condition={isLoadingDrivers || isLoadingDriversCount}>
                        <div className="flex w-full h-96 items-center justify-center">
                            <Loader className="spinner size-6 text-green-brand" />
                        </div>
                    </RenderIf>
                </div>
            </div>
        </div>
    )
}