(() => {
  const isHomeWiFi = $network.wifi?.ssid === "iK_2502_5G";
  const isConnectedToLAN = $network.wifi?.ssid === null;
  const isHomeLAN = $network.v4?.primaryRouter === "192.168.0.1";
  const isHome = isHomeWiFi || (isConnectedToLAN && isHomeLAN);
  const { dnsResult } = $request;

  if (!dnsResult || isHome) {
    return $done({ matched: false });
  }

  const isRequestingHomeNetwork = dnsResult.v4Addresses.some((add) =>
    add.includes("192.168.0")
  );

  if (isRequestingHomeNetwork) {
    return $done({ matched: true });
  }

  $done({ matched: false });
})();
