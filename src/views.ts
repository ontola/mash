import { LRS } from "./LRS";

// TODO: Auto globbing all views might be useful.

import Thing from "./outlines/Thing";
import Image from "./outlines/Image";
import Dataset from "./views/Dataset/Dataset";
import ErrorResource from "./views/ErrorResource";
// import Person from "./views/Person/Person";
// import Place from "./views/Place/Place";
import Property from "./views/Property/Property";
import RDFSClass from "./views/RDFSClass";
// import Resource from "./views/Resource/Resource";

LRS.registerAll(
    ...Dataset,
    ...ErrorResource,
    ...Image,
    // ...Person,
    // ...Place,
    ...Property,
    ...RDFSClass,
    // ...Resource,
    ...Thing,
);
