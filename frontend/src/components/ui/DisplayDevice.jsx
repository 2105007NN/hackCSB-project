import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";

const DeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    browser: "",
    os: "",
    device: "",
  });

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    setDeviceInfo({
      browser: result.browser.name + " " + result.browser.version,
      os: result.os.name + " " + result.os.version,
      device: result.device.model ? result.device.model : "Desktop",
    });
  }, []);

  return (
    <div>
      {/* <h2>Device Information</h2> */}
      {/* <p><strong>Browser:</strong> {deviceInfo.browser}</p>
      <p><strong>Operating System:</strong> {deviceInfo.os}</p>
      <p><strong>Device:</strong> {deviceInfo.device}</p> */}

      <div className="font-light text-sm p-4">
        Browser
        <p className="text-white font-medium text-lg"></p>
        {deviceInfo.browser}
      </div>
      <div className="font-light text-sm p-4">
        Operating System
        <p className="text-white font-medium text-lg"></p>
        {deviceInfo.os}
      </div>
      <div className="font-light text-sm p-4">
        Device
        <p className="text-white font-medium text-lg"></p>
        {deviceInfo.device}
      </div>
    </div>
  );
};

export default DeviceInfo;
