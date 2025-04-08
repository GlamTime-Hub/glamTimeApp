import { useColorScheme } from "@/lib/useColorScheme";
import { CountryPhone } from "@/core/interfaces/country-phone.interface";
import React, { useEffect, useState } from "react";
import PhoneInput, {
  ICountry,
  ILanguage,
} from "react-native-international-phone-number";
import { ICountryCca2 } from "react-native-international-phone-number/lib/interfaces/countryCca2";

interface Props {
  initialPhoneNumber?: string;
  onChangePhone?: (phoneNumber: string) => void;
  onChangeCountry?: (country: CountryPhone) => void;

  disabled?: boolean;
}

export const PhoneNumber = ({
  initialPhoneNumber,
  disabled = false,
  onChangePhone,
  onChangeCountry,
}: Props) => {
  const { isDarkColorScheme } = useColorScheme();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>("");

  //Handle Country Code and Language.
  const countryCodeFinal = "CO";
  const languageCodeFinal: ILanguage = "es";
  //Handle Theme Dark and Light.
  const bgColorContainer = isDarkColorScheme ? "#09090A" : "#FFFFFF";
  const bgColorFlagContainer = isDarkColorScheme ? "#09090A" : "#F5F5F5";
  const textColor = isDarkColorScheme ? "#FFFFFF" : "#09090A";
  const modalBgColor = isDarkColorScheme ? "#09090A" : "#FFFFFF";
  const bgColorCountryButton = isDarkColorScheme ? "#09090A" : "#FFFFFF";

  function handleChangePhone(phoneNumber: string) {
    setInputValue(phoneNumber);

    //if we have defined the function onChangePhone, we call it.
    onChangePhone && onChangePhone(phoneNumber);
  }

  function handleChangeCountry(country: ICountry) {
    if (!country) return;

    setSelectedCountry(country);
    //if we have defined the function onChangeCountry, we call it.
    onChangeCountry &&
      onChangeCountry({
        callingCode: country.callingCode,
        isoCode: country.cca2,
      });
  }

  useEffect(() => {
    setInputValue(initialPhoneNumber ?? "");
  }, []);

  return (
    <PhoneInput
      disabled={disabled}
      language={languageCodeFinal}
      defaultCountry={countryCodeFinal}
      value={inputValue}
      onChangePhoneNumber={handleChangePhone}
      selectedCountry={selectedCountry}
      onChangeSelectedCountry={handleChangeCountry}
      showOnly={["CO"]}
      phoneInputStyles={{
        container: {
          borderRadius: 5,
          backgroundColor: bgColorContainer,
          height: 40,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 0,
        },
        flagContainer: {
          backgroundColor: bgColorFlagContainer,
          justifyContent: "center",
        },
        input: {
          color: textColor,
          paddingVertical: 0,
        },
        callingCode: {
          color: textColor,
        },
        caret: {
          color: textColor,
        },
      }}
      modalStyles={{
        modal: {
          backgroundColor: modalBgColor,
          borderWidth: 2,
          borderColor: "#232427",
        },
        searchInput: {
          backgroundColor: bgColorContainer,
          color: textColor,
        },
        countryButton: {
          backgroundColor: bgColorCountryButton,
        },
        countryName: {
          color: textColor,
        },
        callingCode: {
          color: textColor,
        },
      }}
    />
  );
};
