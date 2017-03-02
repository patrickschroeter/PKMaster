/** Models */
import { ApplicationDetailDto } from './../swagger';

/**
 * Object of Applications by Form ID
 *
 * @export
 * @interface ApplicationsById
 */
export interface ApplicationsByFormId {
    [key: string]: ApplicationDetailDto[];
}
