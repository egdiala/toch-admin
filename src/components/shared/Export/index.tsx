import { Icon } from "@iconify/react";
import { FC, Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InputField, TableAction } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { exportButtonSchema } from "@/validations/export-button";

interface ExportButtonProps {
    email: string;
    loading: boolean;
    setEmail: (email: string) => void;
}

export const ExportButton: FC<ExportButtonProps> = ({ email, loading, setEmail }) => { 
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, setFieldValue } = useFormikWrapper({
        initialValues: {
            email: email,
        },
        enableReinitialize: true,
        validationSchema: exportButtonSchema,
        onSubmit(values) {
            setEmail(values.email);
        }
    })
    useEffect(() => {
        if (!loading) {
            setIsOpen(false);
            setFieldValue("email", "");
        }
    },[loading])
    return (
        <Fragment>
            <TableAction type="button" theme="tertiary" onClick={() => setIsOpen(true)}>
                <Icon icon="lucide:upload" className="size-4 text-grey-dark-2" />
                Export
            </TableAction>
            <AnimatePresence>
                {
                    isOpen ? (
                    <Dialog static className="relative z-10 focus:outline-none" open={isOpen} onClose={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(4px)", transition: { duration: 0.1 } }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            className="fixed inset-0 bg-black/10"
                        />
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <DialogPanel
                                    as={motion.form}
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                                    className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-100 ease-out data-[closed]:transform-[scale(75%)] data-[closed]:opacity-0"
                                >
                                    <DialogTitle as="h3" className="text-base/7 font-medium text-grey-dark-1">
                                        Enter your designation
                                    </DialogTitle>
                                    <p className="mt-1 mb-4 text-sm text-grey-dark-2">
                                        Enter the email address where you want your exported information to be delivered.
                                    </p>
                                    <InputField type="text" placeholder="Enter your email here" {...register("email")} />
                                    <div className="mt-4">
                                        <TableAction disabled={loading} type="submit" theme="primary" block onClick={close}>
                                            { loading ? "Sending..." : "Send" }
                                        </TableAction>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                    ) : null
                }
            </AnimatePresence>
        </Fragment>
    )
}