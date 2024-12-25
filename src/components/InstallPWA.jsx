import React from 'react'

const InstallPWA = () => {

    let shouldShow = false;
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {        
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;        
    });

    async function promptInstallPWA() {        
        if (deferredPrompt) {
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;         
            // Clear the deferredPrompt variable
            deferredPrompt = null;
        }
    }    

    const showInstallButton = () => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!isStandalone && isMobile) {
            shouldShow = true;
        }        
    }

    showInstallButton();


    return (        
        <>            
            {shouldShow && (
                <button
                    className="mt-4 mx-auto block px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"                    
                    onClick={promptInstallPWA}
                >
                    Add to Home screen
                </button>
            )}
        </>
    );
};

export default InstallPWA;