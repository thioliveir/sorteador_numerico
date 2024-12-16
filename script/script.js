// Selecionar elementos no DOM
const form = document.querySelector("form");
const numberQuantityInput = document.getElementById("numberQuantity")
const numberOfInput = document.getElementById("numberOf")
const numberToInput = document.getElementById("numberTo")
const chooseNumberSection = document.querySelector(".content-form.choose-number")
const resultSection = document.querySelector(".content-form.result")
const resultList = document.querySelector("ul")
const resultQuantity = document.querySelector(".content-form.result header p")
const retryButton = document.getElementById("retryBtn")

// Função para validar os valores inseridos nos inputs
function validateInputs() {
    const numQuantity = parseInt(numberQuantityInput.value)
    const numOf = parseInt(numberOfInput.value)
    const numTo = parseInt(numberToInput.value)

    if (numQuantity < 1 || numQuantity > 3) {
        alert("Quantidade de números deve ser entre 1 e 3")
        return false
    }

    if (numOf < 1 || numOf > 100) {
        alert("O número inicial deve ser entre 1 e 100.")
        return false
    }

    if (numTo < 1 || numTo > 100) {
        alert("O número final deve ser entre 1 e 100 e diferente do número inicial.")
        return false
    }

    return true
}

// Função para gerar números aleatórios
function generateRandomNumbers(min, max, quantity, allowRepeats) {
    const numbers = []

    while (numbers.length < quantity) {
        /*
        Math.random() gera um número aleatório entre 0 (inclusive) e 1 (exclusivo).
        Multiplicamos esse número aleatório pelo tamanho do intervalo (max - min + 1)
        (max - min + 1), não chega ao valor de max + 1.
        Math.floor() para arredondar esse número para o inteiro mais próximo
        somamos min para garantir que o valor sorteado estará dentro do intervalo de min a max
        */
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        /*
        allowRepeats for true: Significa que a repetição de números é permitida
        allowRepeats for false - verifica se o número gerado já está no array (!numbers.includes(randomNum))
        Se o número já foi sorteado antes, ele não será adicionado novamente ao array. Apenas números únicos são adicionados ao array.
        */
        if (allowRepeats || !numbers.includes(randomNum)) { 
            numbers.push(randomNum)
        }
    }
    return numbers

}

// Função de Atualizar a lista de números sorteados
let drawnCount = 0
function updateResultQuantity() {
    drawnCount++
    resultQuantity.textContent = `${drawnCount}º resultado`
}

// Evento de submit do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!validateInputs()) return

    const numQuantity = parseInt(numberQuantityInput.value)
    const numOf = parseInt(numberOfInput.value)
    const numTo = parseInt(numberToInput.value)
    const allowRepeats = document.getElementById("repeat").checked

    const drawnNumbers = generateRandomNumbers(numOf, numTo, numQuantity, allowRepeats)

    updateResultQuantity()
    

    // Esconde a seção de escolha e mostra a seção de resultados
    chooseNumberSection.classList.add("d-none")
    resultSection.classList.remove("d-none")

    // Exibe os números sorteados na lista
    resultList.innerHTML = "" // Limpa os resultados anteriores
    drawnNumbers.forEach((number) => {
        const li = document.createElement("li")
        li.classList.add("content-number")

        const span = document.createElement("span")
        li.appendChild(span)

        const p = document.createElement("p")
        p.textContent = number
        li.appendChild(p)

        resultList.appendChild(li)
    })

})



// Evento do botão "Sortear Novamente"
retryButton.addEventListener("click", () => {
    // Esconde a seção de resultados e mostra a seção de escolha
    resultSection.classList.add("d-none")
    chooseNumberSection.classList.remove("d-none")

    // Limpa os inputs
    numberQuantityInput.value = ""
    numberOfInput.value = ""
    numberToInput.value = ""

    document.getElementById("repeat").checked = false
})