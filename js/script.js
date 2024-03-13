const lodeData  = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const {data} = await res.json();
    const itemsContainer  = document.getElementById('item-container');
    data.tools.forEach(item => {
        const newDiv = document.createElement('div');
        newDiv.className = 'card card-compact  bg-base-100 shadow-xl p-4';
        newDiv.innerHTML = `
        <figure><img src="${item.image}"
                alt="Images is not found" /></figure>
        <div class="card-body">
            <h2 class="card-title">${item.name}</h2>
            <ul class="list-decimal">
                <li>${item.features[0]}</li>
                <li>${item.features[1]}</li>
                <li>${item.features[2]}</li>
            </ul>
            <hr class="border">
            <div class="card-actions justify-between items-center">
                <div class="space-y-1">
                    <p class="text-xl font-semibold">ChatGPT</p>
                    <div class="flex justify-center items-center gap-1">
                        <img src="./images/Frame.png" alt="">
                        <p>${item.published_in}</p>
                    </div>
                </div>
                <div class="w-12 h-12 rounded-full bg-[#FEF7F7] flex justify-center">
                    <button onclick="singleDataLode('${item.id}'); my_modal_4.showModal()"><img class="text-center" src="./images/arrow.png" alt=""></button>
                </div>
            </div>
        </div>
        `;
        itemsContainer.appendChild(newDiv);
        
    });
    
}


const singleDataLode = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const {data} = await res.json();
    // console.log(data);
    showModal(data);
}


const showModal = (data) => {

    const openModal = document.getElementById('my_modal_4');
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal-box w-11/12 max-w-5xl';
    modalDiv.innerHTML = `
    <div class="flex items-center justify-center p-32 gap-5 relative z-10">
        <div class="bg-[#fef6f6] p-7 rounded-lg border border-[#EB5757] h-[511px]">
            <p class="text-2xl text-black font-semibold">${data.description}</p>
            <div class="flex justify-around text-center mt-6">
                <div>
                    <ul class="text-[#03A30A] font-bold bg-white p-7 rounded-md">
                        <li>${data.pricing[0].price.slice(0,4)}</li>
                        <li>month</li>
                        <li>${data.pricing[0].plan}</li>
                    </ul>
                </div>
                <div>
                    <ul class="text-[#F28927] font-bold bg-white p-7 rounded-md">
                    <li>${data.pricing[1].price.slice(0,4)}</li>
                        <li>month</li>
                        <li>${data.pricing[1].plan}</li>
                    </ul>
                </div>
                <div>
                    <ul class="text-[#EB5757] font-bold bg-white p-7 rounded-md">
                    <li>${data.pricing[2].price.slice(0,7)}</li>
                        <li>us</li>
                        <li>${data.pricing[2].price.slice(14,22)}</li>
                    </ul>
                </div>
            </div>
            <div class="flex justify-between mt-4">
                <div>
                    <h4 class="text-2xl text-black font-semibold mb-2">Features</h4>
                    <ul class="list-disc">
                        <li>${data.features["1"].feature_name}</li>
                        <li>${data.features["2"].feature_name}</li>
                        <li>${data.features["3"].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-2xl text-black font-semibold mb-2">Integrations</h4>
                    <ul class="list-disc">
                        <li>${data.integrations[0]}</li>
                        <li>${data.integrations[1]}</li>
                        <li>${data.integrations[2]}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="p-7 rounded-lg border border-[#E7E7E7] h-[511px]">
            <div class="card card-compact w-96 bg-base-100">
                <div>
                <figure><img class="h-[339px] bg-cover" src="${data.image_link[0]}" alt="Image can't showing" /></figure>
                <h6 class="bg-red-600 text-white p-3 w-40 text-center absolute top-2 right-2 rounded-lg">${data.accuracy.score.toString().slice(2,4)}% accuracy</h6>
                </div>
                <div class="card-body text-center ">
                  <h2 class="card-title text-black text-center text-2xl font-semibold">${data.input_output_examples[0].input}</h2>
                  <p>${data.input_output_examples[0].output}</p>
                </div>
              </div>
        </div>
    </div>
    <div class="modal-action">
        <form method="dialog" class="absolute top-1 bg-red-500  right-1 p-3 rounded-lg text-white">
            <!-- if there is a button, it will close the modal -->
            <button>Close</button>
        </form>
    </div>
    `;
    openModal.appendChild(modalDiv);
};
lodeData()
