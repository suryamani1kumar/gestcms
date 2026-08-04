"use client";

interface AstrologyProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Astrology({ formData, setFormData }: AstrologyProps) {
  const handleAstrologyChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      astrology: {
        ...prev.astrology,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleCareChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      careInstructions: {
        ...prev.careInstructions,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleBenefitsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      benefits: e.target.value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="space-y-8">
      {/* Astrology */}
      <div>
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Astrology Information
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <div>
            <label className={labelClass}>Planet</label>
            <input
              type="text"
              name="planet"
              value={formData.astrology?.planet || ""}
              onChange={handleAstrologyChange}
              placeholder="Sun"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Zodiac Signs</label>
            <input
              type="text"
              name="zodiacSigns"
              value={(formData.astrology?.zodiacSigns || []).join(", ")}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  astrology: {
                    ...prev.astrology,
                    zodiacSigns: e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  },
                }))
              }
              placeholder="Leo, Aries, Scorpio"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Day to Wear</label>
            <input
              type="text"
              name="dayToWear"
              value={formData.astrology?.dayToWear || ""}
              onChange={handleAstrologyChange}
              placeholder="Sunday"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Finger</label>
            <input
              type="text"
              name="finger"
              value={formData.astrology?.finger || ""}
              onChange={handleAstrologyChange}
              placeholder="Ring Finger"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Metal</label>
            <input
              type="text"
              name="metal"
              value={formData.astrology?.metal || ""}
              onChange={handleAstrologyChange}
              placeholder="Gold"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h3 className="mb-5 text-lg font-semibold text-gray-800">Benefits</h3>

        <label className={labelClass}>One benefit per line</label>

        <textarea
          rows={6}
          value={(formData.benefits || []).join("\n")}
          onChange={handleBenefitsChange}
          placeholder={`Boosts confidence,
Enhances leadership qualities,
Improves career growth,
Provides protection from negativity
,Attracts success and prosperity`}
          className={inputClass}
        />
      </div>

      {/* Care Instructions */}
      <div>
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Care Instructions
        </h3>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className={labelClass}>Cleaning</label>
            <textarea
              rows={3}
              name="cleaning"
              value={formData.careInstructions?.cleaning || ""}
              onChange={handleCareChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Storage</label>
            <textarea
              rows={3}
              name="storage"
              value={formData.careInstructions?.storage || ""}
              onChange={handleCareChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Precautions</label>
            <textarea
              rows={3}
              name="precautions"
              value={formData.careInstructions?.precautions || ""}
              onChange={handleCareChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
