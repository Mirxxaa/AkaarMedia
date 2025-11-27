import React, { useEffect, useRef } from "react";

export default function UnicornEmbed({ projectId = "uusVS15eUHA2ZppC6RSP" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load the UnicornStudio script dynamically
    const script = document.createElement("script");
    script.src = "https://framer.com/m/UnicornStudioEmbed-wWy9.js"; // official JS SDK
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }

      window.UnicornStudio?.load({
        projectId,
        container: containerRef.current,
      });
    };

    return () => {
      // Cleanup
      if (containerRef.current) containerRef.current.innerHTML = "";
      document.body.removeChild(script);
    };
  }, [projectId]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}
