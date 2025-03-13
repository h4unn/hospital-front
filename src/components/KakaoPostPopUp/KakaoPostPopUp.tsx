import { useDaumPostcodePopup } from "react-daum-postcode";
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
    <button type="button" onClick={handleClick}>
      Open
    </button>
  );
};
export default KakaoPostPopUp;
