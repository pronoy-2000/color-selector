const btn = document.querySelector(".selectBtn");
const colors = document.querySelector(".colors");
const hexValue = document.querySelector(".hexValue");

async function selectColor() {
    // console.log('Working!');
    try {
        const eyeDropper = new EyeDropper(); 
        return await eyeDropper.open();
    } catch (err) {
        console.error(err);
    }
}
btn.addEventListener('click', async () => {
    // console.log('clicked')
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // console.log(tab);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: selectColor,
    }, async (colorObject) => {
        // console.log(color);
        const [data] = colorObject;
        if (data.result) {
            const color = data.result.sRGBHex;
            colors.style.backgroundColor = color;
            hexValue.textContent = color;
            try {
                await navigator.clipboard.writeText(color);
            } catch (err) {
                console.error(err);
            }
        }
    });
});