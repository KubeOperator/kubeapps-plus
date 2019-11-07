/**
 * @id example: stable/aerospike
 * @return example: stable
 * @author: maguohao
 */
export function splitName (id) {
    if (id == null || name == null) {
        return ''
    }
    let str = id.split('/')[0]
    return str
}
