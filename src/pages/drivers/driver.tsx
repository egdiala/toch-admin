import { Fragment, useEffect } from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { useGetDriver } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { RenderIf, TableAction } from "@/components/core"
import { NavLink, Outlet, useNavigate, useParams } from "react-router"

export const DriverPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: driver, isFetching } = useGetDriver(id as string)
    const subRoutes = [
        { name: "Profile", link: `/drivers/${id as string}/profile` },
        { name: "Application", link: `/drivers/${id as string}/application` },
    ]
    useEffect(() => {
        if (!driver?.driver_id && !isFetching) {
            navigate("/drivers")
        }
    },[driver?.driver_id, isFetching, navigate])
    return (
        <div className="p-4 md:p-6 view-page-container overflow-y-scroll">
            <RenderIf condition={!isFetching}>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="rounded-full border border-grey-dark-3 p-1 flex items-center gap-2 w-fit overflow-scroll scrollbar-hide">
                            {
                                subRoutes.map((route, idx) => 
                                <Fragment key={route.link}>
                                    <NavLink to={route.link} className="flex w-full">
                                    {({ isActive }) => (
                                        <div className={cn("text-center py-1 px-5 flex-1 rounded-full whitespace-nowrap text-sm text-green-0", isActive ? "bg-accent-1 font-medium" : "hover:bg-accent-1")}>
                                            {route.name}
                                        </div>
                                    )}
                                    </NavLink>
                                    <RenderIf condition={(subRoutes.length - 1) !== idx}><div className="h-5 rounded w-0 block border-r border-r-[#DADCDD]" /></RenderIf>
                                </Fragment>
                                )
                            }
                        </div>
                        <TableAction theme="tertiary">
                            <Icon icon="lucide:upload" className="size-4 text-grey-dark-2" />
                            Export
                        </TableAction>
                    </div>
                    <Outlet />
                </div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center">
                    <Loader className="spinner size-6 text-green-brand" />
                </div>
            </RenderIf>
        </div>
    )
}