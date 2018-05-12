import { LRS } from "./LRS";

// TODO: Auto globbing all views might be useful.

import ErrorResource from "./views/ErrorResource";
import Image from "./views/Image";
import Person from "./views/Person/Person";
import Place from "./views/Place/Place";
import RDFSClass from "./views/RDFSClass";
import Thing from "./views/Thing/Thing";

LRS.registerAll(
    ...ErrorResource,
    ...Image,
    ...Person,
    ...Place,
    ...RDFSClass,
    ...Thing,
);
