module.exports = (req, rsp, next) => {


    const pageAsNumber = Number.parseInt(req.query.page)
    const sizeAsNumber = Number.parseInt(req.query.size)

    let Sort = req.query.sort || "id"

    // console.log(Sort);
    let page = 0
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber
    }
    let size = 2
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 2) {
        size = sizeAsNumber
    }

    req.pagenation = { page, size, Sort }
    next()
}