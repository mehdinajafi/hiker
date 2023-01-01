import clsx from "clsx";
import InfoIcon from "@/public/icons/info-outline.svg";
import ErrorIcon from "@/public/icons/error-outline.svg";
import SuccessIcon from "@/public/icons/success-outline.svg";
import WarningIcon from "@/public/icons/report-problem-outline.svg";

interface IAlert {
  /**
   * The severity of the alert. This defines the color and icon used.
   */
  severity?: "info" | "error" | "success" | "warning";
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

const icons: Record<NonNullable<IAlert["severity"]>, React.ReactNode> = {
  info: <InfoIcon width={24} height={24} aria-hidden="true" />,
  error: <ErrorIcon width={24} height={24} aria-hidden="true" />,
  success: <SuccessIcon width={24} height={24} aria-hidden="true" />,
  warning: <WarningIcon width={24} height={24} aria-hidden="true" />,
};

const Alert: React.FC<IAlert> = (props) => {
  const { severity = "info", children } = props;

  return (
    <div
      className={clsx(
        "flex items-center rounded-r-sm border-l-4 p-2 text-white",
        {
          "border-info bg-muted": severity === "info",
          "border-error bg-error-background": severity === "error",
          "border-success bg-success-background": severity === "success",
          "border-alert bg-alert-background": severity === "warning",
        }
      )}
    >
      <span
        className={clsx("mr-3 self-start", {
          "text-info": severity === "info",
          "text-error": severity === "error",
          "text-success": severity === "success",
          "text-alert": severity === "warning",
        })}
      >
        {icons[severity]}
      </span>
      <span className="text-subtitle2">{children}</span>
    </div>
  );
};

export default Alert;
