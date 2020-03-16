import React from 'react';

const ClickedPackage = ({ clickedPackage }) => {
  let pkg = clickedPackage;
  let dependencies = ``
  let name = pkg['Package:']
  let description = pkg['Description:']
  let depends = pkg['Depends:'];
  let preDepends = pkg['Pre-Depends:'];
  let suggests = pkg['Suggests:']
  let installedSize = pkg['Installed-size:']
  let originalMaintainer = pkg['Original-Maintainer:'];

  if (depends) {
    dependencies = `Dependencies : ${depends}`;
  } else if (!depends && preDepends) {
    dependencies = `Pre-Dependencies : ${preDepends}`;
  }

  return (
    <div>
      <small>
        Click on the packages on the left column <br /> and display its details
        below
      </small>

      <h1>{name ? `Package Name : ${name}` : ``}</h1>
      <p>{description? `Description : ${description}` : ``}</p>
      <p>{dependencies}</p>
      <p>{suggests ? `Suggests : ${suggests}` : ``}</p>
      <p>{installedSize ? `Installed-Size : ${installedSize}` : ``}</p>
      <p>{originalMaintainer? `Original-Maintainer : ${installedSize}` : ``}</p>
    </div>
  );
};

export default ClickedPackage;
