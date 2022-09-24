import Notice from "@components/Notice";
import { notification } from "@prisma/client";
import Link from "next/link";
import { BtnSecondary } from "./btn";

export default function Notifications({
  notifications,
  hasBtn = true,
}: {
  notifications: notification[];
  hasBtn?: boolean;
}): JSX.Element {
  const notificationsTypes = new Set();

  notifications.forEach((notification) =>
    notificationsTypes.add(notification.information_type)
  );

  return (
    <div>
      <section>
        <h2 className="overlap">In game notices</h2>

        <div className="flex flex-col gap-y-8">
          {notifications.map((notification) => (
            <Notice key={notification.notification_id} {...notification} />
          ))}
        </div>
      </section>

      {hasBtn && (
        <div className="flex justify-center mt-8">
          <Link href="/notices" passHref>
            <BtnSecondary>See more notices</BtnSecondary>
          </Link>
        </div>
      )}
    </div>
  );
}
