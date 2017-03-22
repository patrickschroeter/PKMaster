/** Models */
import { ApplicationDetailDto } from 'app/swagger';

/**
 * Object of Applications by Form ID
 *
 * @export
 * @interface ApplicationsById
 */
export interface ApplicationsByFormId {
    [key: string]: ApplicationDetailDto[];
}
