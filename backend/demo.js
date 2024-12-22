const fileinput = document.getElementById("fileinput")

fileinput.addEventListener("change", (event) => {
    const file = event.target.files[0]

    const reader = new FileReader()

    reader.onload = function (event) {
        const data = event.target.result
        const workbook = XLSX.read(data, { type: "binary" })
        // console.log(workbook)
        const sheetname = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetname]
        // console.log(worksheet)
        const emaillist = XLSX.utils.sheet_to_json(worksheet,{header:"A"})
        console.log(emaillist)
    }

    reader.readAsBinaryString(file)
})