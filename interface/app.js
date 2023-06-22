function get() {
    navigator.sendBeacon('https://zobyeteam_dailylogin/receive');
}

addEventListener('message', ({ data }) => {
    if (data.action === 'loadData') {
        // DAY 1 - 6
        const normalRewards = document.querySelector('#normalRewards');
        const items = [...data.items];
        items.splice(6, 1);

        normalRewards.innerHTML = '';

        // <img src="./Items-image.png"/>
        // <img src="nui://zobyeteam_inventory/interface/image/items/${item.name}.png"/>
        // <img src="nui://zobyeteam_inventory/interface/image/items/${data.items[6].name}.png"/>

        for (let index in items) {
            const item = items[index];

            const element = document.createElement('div');

            element.className = `reward`;
            element.innerHTML = `
                <p>Day ${Number(index) + 1}</p>
                <div class="image">
                    <img src="nui://zobyeteam_inventory/interface/image/items/${item.name}.png"/>
                </div>
                ${item.isReceived ? `
                    <div class="get already">
                        Already
                    </div>
                ` : `
                    <div onclick="get()" class="get">
                        Get
                    </div>
                `}
            `

            normalRewards.appendChild(element);
        };

        // DAY 7
        bigRewards.innerHTML = `
            <p>Day 7</p>
            <div class="image">
                <img src="nui://zobyeteam_inventory/interface/image/items/${data.items[6].name}.png"/>
            </div>
            ${data.items[6].isReceived ? `
                <div class="get already">
                    Already
                </div>
            ` : `
                <div onclick="get()" class="get">
                    Get
                </div>
            `}
        `;
    } else if (data.action === 'openDisplay') {
        container.style.opacity = 1;
    } else if (data.action === 'closeDisplay') {
        container.style.opacity = 0;
    }
});

addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
        navigator.sendBeacon('https://zobyeteam_dailylogin/closeDisplay');
    }
});

// postMessage({
//     action: 'openDisplay'
// })

// postMessage({
//     "items": [
//         {
//             "canReceive": true,
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         },
//         {
//             "amount": 5,
//             "isReceived": false,
//             "name": "water"
//         }
//     ],
//     "action": "loadData"
// });