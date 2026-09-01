import { FaPlus } from "react-icons/fa6";

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
}

export default function PageHeader({
  title,
  description,
  buttonText = "Add",
  onButtonClick,
  showButton = true,
}: PageHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-[16px] font-bold leading-5 text-[#25282c]">
          {title}
        </h1>

        <p className="mt-0.5 text-[12px] text-[#85898d]">{description}</p>
      </div>

      {showButton && (
        <button
          type="button"
          onClick={onButtonClick}
          className="cursor-pointer flex h-[30px] items-center gap-1.5 rounded-[4px] bg-[#111923] px-3 text-[11px] font-medium text-white shadow-sm transition hover:bg-[#202b39]"
        >
          <FaPlus className="text-[14px]" />
          {buttonText}
        </button>
      )}
    </div>
  );
}
