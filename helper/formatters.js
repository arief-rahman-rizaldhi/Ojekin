function toRupiah(value) {
    return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
    });
}

function toDateIndonesia(value) {
    return value.toLocaleString("id-ID", { dateStyle: "long" })
}

module.exports = { toRupiah, toDateIndonesia }