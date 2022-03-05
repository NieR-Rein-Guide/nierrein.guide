import { NierNotification } from "@models/types";
import Notice from "@components/Notice";

export default function Notifications({
  notifications,
}: {
  notifications: NierNotification[];
}): JSX.Element {
  return (
    <section>
      <h2 className="overlap">In game notices</h2>

      <div className="flex flex-col gap-y-8">
        {notifications.map((notification) => (
          <Notice key={notification.informationId} {...notification} />
        ))}
      </div>
    </section>
  );
}
