import React, { useState } from "react";
import { Icon } from "@iconify/react";
import blankImage from "@/assets/blank.svg";
import { getAdminData } from "@/utils/authUtil";
import { useRouteTitle } from "@/hooks/useRouteTitle";
// import { NotificationsModal } from "@/components/pages/profile";

interface HeaderProps {
  close: () => void;
}

export const Header: React.FC<HeaderProps> = ({ close }) => {
  const loggedInUser = getAdminData();

  const avatar = loggedInUser?.avatar || blankImage;
  const routeTitle = useRouteTitle();

  const [_, setOpenNotificationsModal] = useState(false);

  return (
    <header className="flex items-center gap-3 sticky top-0 left-0 right-0 justify-between w-full bg-accent-2 px-4 pt-6 pb-4">
      <div className="flex items-center gap-2">
        <button type="button" className="xl:hidden" onClick={() => close()}>
          <Icon icon="lucide:menu" className="text-white size-5" />
        </button>
        <h1 className="font-bold text-white text-xl md:text-2xl">
          {routeTitle}
        </h1>
      </div>

      <div className="flex items-center justify-end gap-6">
        <a
          href="/profile"
          className="flex items-center gap-1 px-3 py-2.5 bg-green-5 rounded-full cursor-pointer"
        >
          <span className="text-sm font-medium text-white">Quick Actions</span>
          <Icon icon="lucide:chevron-down" className="text-accent-1 size-4" />
        </a>
        <button
          type="button"
          className="relative bg-green-5 rounded-2xl size-10 grid place-content-center"
          onClick={() => setOpenNotificationsModal(true)}
        >
          <Icon icon="lucide:bell" className="text-accent-1 size-5" />
          <span className="absolute -top-2.5 -right-2.5 py-1 px-1.5 flex items-center justify-center text-center bg-semantic-error rounded-full text-[0.625rem] font-medium text-white">
            03
          </span>
        </button>
        <a
          href="/profile"
          className="flex items-center gap-1 p-1 bg-green-5 rounded-full cursor-pointer"
        >
          <div className="size-8 rounded-full overflow-hidden">
            <img alt="avatar" src={avatar} className="size-8" />
          </div>
          <Icon icon="lucide:chevron-down" className="text-accent-1 size-4" />
        </a>
      </div>

      {/* <NotificationsModal
        isOpen={openNotificationsModal}
        onClose={() => setOpenNotificationsModal(false)}
      /> */}
    </header>
  );
};