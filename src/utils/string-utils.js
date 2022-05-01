const convertDocumentNumberToNumber = (doc) => (
    Number.parseInt(doc.replace(/[\ \.\_\-]/g, ''))
)

export { convertDocumentNumberToNumber }