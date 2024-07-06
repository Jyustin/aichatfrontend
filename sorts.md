---
layout: page
search_exclude: true
permalink: sorts
--- 

# Bubble Sort

Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed. 

**check out our video performance on an indepth live explination >>**

## Video


<embed>


## What We Learned

**Numbers**

We analyzed how the judges looked at the other groups and our performance. We realized a lot of the critique was from the numbers and the number representation. Our group had clear numbers and the audencie was able to see it from afar. Other groupd like Tay's flower presentation also had a clear and detailed numbers that the audience could see.

**Sorting**

Since we had bubble sort it was easy to see how the sort worked, other groups had a lot harder sorts which made it relativly difficult to present. Clearly presentng the sort is priority since some of the judges are unfamiliar of how each sort really works.

**Art/Music**

Performances which utilized music and AMAZING choreography (like Drew/Tay's group) really did well and engaged the audience!! <3

<style>
    #container {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-top: 50px;
    }

    .bar-container {
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bar {
        width: 20px;
        background-color: #007bff;
        margin-bottom: 5px;
    }

    .number-box {
        font-size: 14px;
        margin-top: 5px;
    }
</style>


<body>
    <div id="container"></div>
    <script>
        async function bubbleSort(arr) {
            const container = document.getElementById('container');
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length - i - 1; j++) {
                    await sleep(100);
                    if (arr[j] > arr[j + 1]) {
                        // Swap elements
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        // Update bars display
                        updateBars(arr, container);
                    }
                }
            }
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        function updateBars(arr, container) {
            container.innerHTML = '';
            for (let i = 0; i < arr.length; i++) {
                const barContainer = document.createElement('div');
                barContainer.className = 'bar-container';
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = arr[i] * 5 + 'px';
                const numberBox = document.createElement('div');
                numberBox.className = 'number-box';
                numberBox.textContent = arr[i];
                barContainer.appendChild(bar);
                barContainer.appendChild(numberBox);
                container.appendChild(barContainer);
            }
        }
        // Initial array
        const arr = [2, 4, 1, 7, 3, 5, 6, 8, 12, 10, 9, 11];
        const container = document.getElementById('container');
        updateBars(arr, container);
        // Start bubble sort
        bubbleSort(arr);
</script>
</body>

