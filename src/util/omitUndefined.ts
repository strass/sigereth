import { omitBy, isUndefined } from 'lodash';

export default (object: object) => omitBy(object, isUndefined);
