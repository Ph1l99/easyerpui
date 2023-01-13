# EASY ERP - UI
Easy ERP has been developed for a friend which owns a repair shop. He wanted an ERP fitted for its needs and, at the same time, easy to use.

This project must be used together with [this one](https://github.com/Ph1l99/easyErp).

## Technologies
This project has been developed using [Next.js](https://nextjs.org/) and TypeScript with the help
of [tailwindcss](https://tailwindcss.com/). All icons come from [FontAwesome](https://fontawesome.com/).

## Installation
This project can be run via [docker](https://www.docker.com/s) or via standard npm.

To run it with docker:
- Download the project
- Install the needed dependencies `npm install`
- Build the image `docker build -t easyerpui`
- Execute the container `docker run -d -p 3000:3000 -e EASYERP_BACKEND_SERVER="YOUR BACKEND HOSTNAME" -t easyerp:latest`

#### Additional notes
Each repair status has its own color: since tailwind scans the project for used classes, make sure
to add the background clases of your choices to the `tailwind.config.js` file in the `safelist` array.

## Contributors
Thanks to [NessunoRAWRS](https://github.com/NessunoRAWRS).

Icons used:
- <a target="_blank" href="https://icons8.com/icon/W6CIpQVQkuA5/production">Production</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

## DISCLAIMER
EasyErp is provided "as is", with no guarantee of completeness and accuracy of the results obtained
from the use of this software, and without warranty of any kind, express or implied. <br>
The authors will not be liable to anyone for any decision made or action taken in reliance on
the information given by EasyErp or for any consequential, special or similar damages, even if advised of the possibility of such damages.

## License
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)