import { Table } from "@/components/core"
import { updateQueryParams } from "@/hooks/usePaginationParams"
import { useGetDrivers } from "@/services/hooks/queries"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"

export const DriversPage = () => {
    const [itemsPerPage] = useState(10)
    const [driverFilters, setDriverFilters] = useState({
        page: 1
    })
    useGetDrivers({ ...driverFilters, item_per_page: itemsPerPage.toString() })
    const driverCards = [
        { label: "All Drivers", value: "7,231", percentage: "+20.1%" },
        { label: "Pending Drivers", value: "3,231", percentage: "+20.1%" },
        { label: "Registered Drivers", value: "3,231", percentage: "+20.1%" },
        { label: "Verified Drivers", value: "3,231", percentage: "+20.1%" },
    ]
    const columns = [
        {
            header: () => "Reg. Date",
            accessorKey: "createdAt",
        },
        {
            header: () => "Name",
            accessorKey: "fullName",
        },
        {
            header: () => "Email",
            accessorKey: "email",
        },
        {
            header: () => "Phone Number",
            accessorKey: "phone_number",
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
                <div className="grid grid-cols-4 gap-6">
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
                    <Table
                        page={driverFilters.page}
                        columns={columns}
                        perPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        data={[]}
                        totalCount={0}
                        emptyStateText="We couldn't find any driver on the system."
                    />
                </div>
            </div>
        </div>
    )
}