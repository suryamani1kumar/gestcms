import React from "react";

const StatCard = ({
    title,
    value,
    change,
    positive,
    icon,
    iconBg,
    iconColor,
}: {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
}) => {
    return (
        <div className=" rounded-[7px] border border-[#e8e5df] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2.5">
                <div
                    className={` flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor} text-[19px] `}
                >
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-[12px] font-medium text-[#666b70]">{title}</p>

                    <p className="mt-1.5 text-[18px] font-semibold leading-4 text-[#282c30]">
                        {value}
                    </p>

                    <p className="mt-1 text-[10px] text-[#9a9da1]">
                        <span
                            className={
                                positive
                                    ? "font-medium text-[#42a76a]"
                                    : "font-medium text-[#e05d62]"
                            }
                        >
                            {positive ? "↑" : "↓"} {change}
                        </span>{" "}
                        vs last month
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
