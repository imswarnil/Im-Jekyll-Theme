(() => {
    const registerServiceWorker = () => {
      if (!navigator.serviceWorker) {
        console.log("Service Worker: not supported");
        return;
      }
  
      navigator.serviceWorker
        .register("{{ '/sw.js' | relative_url }}")
        .then(registration => {
          console.log("Service Worker: registered with scope:", registration.scope);
        })
        .catch(err => {
          console.error("Service Worker: registration failed", err);
        });
    };
  
    registerServiceWorker();
  })();
  