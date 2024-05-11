import spotResolvers from '../projects/spotAction/graphQL/resolvers';
import spotTypeDefs from '../projects/spotAction/graphQL/typeDefs';

const typeDefs = { ...spotTypeDefs };
const resolvers = { ...spotResolvers };

export default { typeDefs, resolvers };
