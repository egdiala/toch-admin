import { type FC, type ReactNode, useEffect, useMemo } from "react"
import { format } from "date-fns"
import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import useMeasure from "react-use-measure"
import blankImage from "@/assets/blank.svg"
import { useGetDriver } from "@/services/hooks/queries"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"

interface DisclosureWrapperProps {
    title: string;
    titleIcon: string;
    children: ReactNode
}

const DisclosureWrapper: FC<DisclosureWrapperProps> = ({ children, titleIcon, title }) => {
    const [ref, bounds] = useMeasure()
    return (
        <Disclosure as={motion.div} animate={{ height: bounds.height }} className="rounded-lg border border-grey-dark-3 overflow-hidden" defaultOpen={true}>
            <div ref={ref} className="px-5 py-4">
                <DisclosureButton className="group flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Icon icon={titleIcon} className="size-5 text-grey-dark-2" />
                        <span className="text-sm font-semibold text-grey-dark-1">{title}</span>
                    </div>
                    <div className="grid place-content-center size-8 bg-grey-dark-4 rounded-full">
                        <Icon icon="lucide:chevron-up" className="size-5 text-grey-dark-2 group-data-[open]:rotate-180 transition-transform duration-150 ease-out" />
                    </div>
                </DisclosureButton>
                <DisclosurePanel className="mt-4">
                    {children}
                </DisclosurePanel>
            </div>
        </Disclosure>
    )
}

export const DriverProfilePage = () => {
    const { data: driver, refetch } = useGetDriver("")

    const gridItems = useMemo(() => {
        return [
            { label: "First Name", value: driver?.first_name },
            { label: "Last Name", value: driver?.last_name },
            { label: "Email", value: driver?.email },
            { label: "Phone Number", value: driver?.phone_number },
            { label: "Gender", value: driver?.gender },
            { label: "Date of Birth", value: format(driver?.dob || new Date(), "do MMMM, yyyy") },
        ]
    }, [driver?.dob, driver?.email, driver?.first_name, driver?.gender, driver?.last_name, driver?.phone_number])
    
    const addresses = useMemo(() => {
        return [
            { label: "Address", value: `${driver?.residence_housenumber}, ${driver?.residence_streetname}, ${driver?.residence_bustop}` },
            { label: "Popular Landmark", value: driver?.residence_landmark },
            { label: "LGA", value: driver?.residence_lga },
            { label: "State", value: driver?.residence_state },
        ]
    },[driver?.residence_bustop, driver?.residence_housenumber, driver?.residence_landmark, driver?.residence_lga, driver?.residence_state, driver?.residence_streetname])
    
    const nationality = useMemo(() => {
        return [
            { label: "Nationality", value: driver?.nationality },
            { label: "State of Origin", value: driver?.origin_state },
            { label: "LGA of Origin", value: driver?.origin_lga },
        ]
    },[driver?.nationality, driver?.origin_lga, driver?.origin_state])
    
    const identity = useMemo(() => {
        return [
            { label: "Driver License No.", value: driver?.driver_license_id?.value },
            { label: "NIN", value: driver?.nin_id?.value },
            { label: "LASSRA ID (Lagos Residents Only)", value: driver?.lasrra_id?.value },
        ]
    },[driver?.driver_license_id?.value, driver?.lasrra_id?.value, driver?.nin_id?.value])
    
    const works = useMemo(() => {
        return [
            { label: "Years of Experience", value: `${driver?.exp_year} ${driver?.exp_year === 1 ? "year" : "years"}` },
            { label: "Has Experience with", value: driver?.exp_vehicle.map((vehicle, key) => <div key={key} className="font-medium py-1 px-2 rounded-full bg-grey-dark-4">{vehicle}</div>) },
        ]
    },[driver?.exp_vehicle, driver?.exp_year])
    
    const education = useMemo(() => {
        return [
            { label: "Highest Level of Education", value: driver?.highest_level.replace(/-/i, " ") },
            { label: "School Name", value: driver?.school },
        ]
    },[driver?.highest_level, driver?.school])
    
    const medicals = useMemo(() => {
        return [
            { label: "Blood Group", value: driver?.blood_group },
            { label: "Wear Eye glasses?", value: driver?.wear_glasses },
        ]
    },[driver?.blood_group, driver?.wear_glasses])

    useEffect(() => {
        if (driver === undefined) {
            refetch()
        }
    },[driver, refetch])
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row items-center gap-8 py-5 px-4 bg-accent-2 rounded-lg">
                <div className="grid justify-items-center relative">
                    <div className="relative border border-green-3 rounded-lg w-32 h-full overflow-hidden">
                        <img src={driver?.avatar || blankImage} alt={`${driver?.first_name}_${driver?.last_name}`} className="object-cover w-32 h-full" />
                    </div>
                    <div className="absolute -bottom-3.5 bg-orange-3 text-sm py-1 px-3 rounded-full">Level 1</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                    {
                        gridItems.map((item, key) =>
                            <div key={key} className="grid gap-1">
                                <span className="text-sm text-grey-dark-3">{item?.label}</span>
                                <p className="text-sm text-white">{item?.value}</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <DisclosureWrapper title="Home Address" titleIcon="lucide:map-pin-house">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                {
                    addresses.map((address, key) =>
                        <div key={key} className="grid gap-1 content-start">
                            <span className="text-sm text-grey-dark-2">{address?.label}</span>
                            <p className="text-sm text-green-0">{address?.value}</p>
                        </div>
                    )
                }
                </div>
            </DisclosureWrapper>
            <DisclosureWrapper title="Nationality Details" titleIcon="lucide:globe-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                {
                    nationality.map((item, key) =>
                        <div key={key} className="grid gap-1 content-start">
                            <span className="text-sm text-grey-dark-2">{item?.label}</span>
                            <p className="text-sm text-green-0">{item?.value}</p>
                        </div>
                    )
                }
                </div>
            </DisclosureWrapper>
            <DisclosureWrapper title="Identification Documents" titleIcon="lucide:id-card">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                {
                    identity.map((item, key) =>
                        <div key={key} className="grid gap-1 content-start">
                            <span className="text-sm text-grey-dark-2">{item?.label}</span>
                            <p className="text-sm text-green-0">{item?.value}</p>
                        </div>
                    )
                }
                </div>
            </DisclosureWrapper>
            <DisclosureWrapper title="Work History" titleIcon="lucide:briefcase-business">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {
                    works.map((work, key) =>
                        <div key={key} className="grid gap-1 content-start">
                            <span className="text-sm text-grey-dark-2">{work?.label}</span>
                            <div className="flex items-center gap-2 text-sm text-green-0">{work?.value}</div>
                        </div>
                    )
                }
                </div>
            </DisclosureWrapper>
            <DisclosureWrapper title="Education" titleIcon="lucide:graduation-cap">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {
                    education.map((item, key) =>
                        <div key={key} className="grid gap-1 content-start">
                            <span className="text-sm text-grey-dark-2">{item?.label}</span>
                            <p className="flex items-center gap-2 text-sm text-green-0 capitalize">{item?.value}</p>
                        </div>
                    )
                }
                </div>
            </DisclosureWrapper>
            <DisclosureWrapper title="Medicals" titleIcon="lucide:heart-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {
                    medicals.map((item, key) =>
                        <div key={key} className="grid gap-1 content-start">
                            <span className="text-sm text-grey-dark-2">{item?.label}</span>
                            <p className="flex items-center gap-2 text-sm text-green-0 capitalize">{item?.value}</p>
                        </div>
                    )
                }
                </div>
            </DisclosureWrapper>
        </div>
    )
}