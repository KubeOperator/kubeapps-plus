const CatalogEnerty = {

    constructor(catalog){
        this.catalog = {}
        this.setCatalog(catalog)
    },

    setCatalog (catalog) {
        this.catalog.id= catalog.id,
        this.catalog.icon= catalog.attributes.icon,
        this.catalog.version= catalog.relationships.latestChartVersion.data.version,
        this.catalog.appVersion= catalog.relationships.latestChartVersion.data.app_version,
        this.catalog.desc= catalog.attributes.description,
        this.catalog.home= catalog.attributes.home,
        this.catalog.sources= catalog.attributes.sources,
        this.catalog.maintainers= catalog.attributes.maintainers
    },

    getCatalog (catalog) {
        this.constructor(catalog)
        return this.catalog
    }
}

const CatalogDetailEnerty = {

    constructor(catalog){
        this.catalogDetail = {}
        this.setCatalogDetail(catalog)
    },

    setCatalogDetail(catalog) {
        this.catalogDetail.id= catalog.id,
        this.catalogDetail.version= catalog.attributes.version,
        this.catalogDetail.appVersion= catalog.attributes.app_version,
        this.catalogDetail.desc= catalog.relationships.chart.data.description,
        this.catalogDetail.icon= catalog.relationships.chart.data.icon,
        this.catalogDetail.home= catalog.relationships.chart.data.home,
        this.catalogDetail.sources= catalog.relationships.chart.data.sources,
        this.catalogDetail.maintainers= catalog.relationships.chart.data.maintainers
    },

    getCatalogDetail(catalog) {
        this.constructor(catalog)
        return this.catalogDetail
    }
}

const enerty = {CatalogEnerty, CatalogDetailEnerty}
export default enerty
