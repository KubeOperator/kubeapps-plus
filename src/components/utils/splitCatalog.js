/**
 * @id example: stable/aerospike
 * @name example: aerospike
 * @author: maguohao
 */
export function splitName (id, name) {
    if (id == null || name == null) {
        return ''
    }
    let str = id.split('/').get(0)
    return str
}
