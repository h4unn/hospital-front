import { useDaumPostcodePopup } from "react-daum-postcode";
import Button from "@/component/Button/Button";
type KakaoPostPopUpProps = {
  setAddress?: React.Dispatch<React.SetStateAction<string>>;
  setDetailAddress?: React.Dispatch<React.SetStateAction<string>>;
  setPostcode?: React.Dispatch<React.SetStateAction<string>>;
};

const KakaoPostPopUp: React.FC<KakaoPostPopUpProps> = ({
  setAddress,
  setDetailAddress,
  setPostcode,
}) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      if (setAddress) setAddress(fullAddress);
      if (setDetailAddress) setDetailAddress(extraAddress);
      if (setPostcode) setPostcode(data.zonecode);
      return (fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "");
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button
      label="검색"
      type="button"
      onClick={handleClick}
      backgroundColor={"#FFEA3C"}
      borderColor={"#BFC662"}
    />
  );
};
export default KakaoPostPopUp;
