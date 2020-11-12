import homeRouter from "./homeRouter";
import mapgodownRouter from "./mapgodownRouter";
import testRouter from "./testRouter";
import printRouter from "./printRouter";
import videoRouter from "./videoRouter";
import editRouter from "./editRouter";
import weatherserviceRouter from "./weatherserviceRouter";
import systemManageRouter from "./systemManageRouter";

export default [
  ...homeRouter,
  ...mapgodownRouter,
  ...testRouter,
  ...printRouter,
  ...videoRouter,
  ...editRouter,
  ...weatherserviceRouter,
  ...systemManageRouter,
];
