import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Step2 = ({
  register,
  errors,
  setValue,
}: {
  register: any;
  errors: any;
  setValue: any;
}) => {
  return (
    <>
      <div>
        <Label
          htmlFor={"companyRegistrationNumber"}
          className="text-sm font-medium"
        >
          Company Registration Number
          {errors.companyRegistrationNumber && (
            <p className="text-red-500 text-xs">
              {errors.companyRegistrationNumber.message}
            </p>
          )}
        </Label>
        <Input
          {...register("companyRegistrationNumber")}
          id="companyRegistrationNumber"
          type="text"
          placeholder="company Registration Number"
          className="m-0 mt-1"
        />
      </div>
      <div>
        <Label
          htmlFor={"yearOfEstablishment"}
          className="text-sm font-medium"
        >
          Year Of Establishment
          {errors.yearOfEstablishment && (
            <p className="text-red-500 text-xs">
              {errors.yearOfEstablishment.message}
            </p>
          )}
        </Label>
        <Input
          {...register("yearOfEstablishment")}
          id="yearOfEstablishment"
          type="number"
          placeholder="Agency year Of Establishment"
          className="m-0 mt-1"
        />
      </div>
      <div>
        <Label
          htmlFor={"businessLicenseUpload"}
          className="text-sm font-medium"
        >
          Business License Upload
          {errors.businessLicenseUpload && (
            <p className="text-red-500 text-xs">
              {errors.businessLicenseUpload.message}
            </p>
          )}
        </Label>
        <Input
          onChange={(e) =>
            setValue(
              "businessLicenseUpload",
              e.target.files && e.target.files[0]
            )
          }
          id="businessLicenseUpload"
          type="file"
          placeholder="business License Upload"
          className="m-0 mt-1"
        />
      </div>
      <div>
        <Label
          htmlFor={"insuranceCertificateUpload"}
          className="text-sm font-medium"
        >
          Insurance Certificate Upload
          {errors.insuranceCertificateUpload && (
            <p className="text-red-500 text-xs">
              {errors.insuranceCertificateUpload.message}
            </p>
          )}
        </Label>
        <Input
          onChange={(e) =>
            setValue(
              "insuranceCertificateUpload",
              e.target.files && e.target.files[0]
            )
          }
          id="insuranceCertificateUpload"
          type="file"
          placeholder="insurance Certificate Upload"
          className="m-0 mt-1"
        />
      </div>
    </>
  );
};
export default Step2;
