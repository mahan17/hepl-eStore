import { ref, set } from "firebase/database";
import { database } from "./firebase";

set(ref(database, 'test'), {
  connected: true,
});
