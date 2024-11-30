import './styles.css';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


library.add(faGithub, faPlus, faTrash);
dom.watch();

