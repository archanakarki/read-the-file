import React from 'react';
import './css/ClickedPackage.css';

const ClickedPackage = ({ clickedPackage }) => {
  let pkg = clickedPackage;
  let dependencies = ``;
  let name = pkg['Package:'];
  let description = pkg['Description:'];
  let depends = pkg['Depends:'];
  let preDepends = pkg['Pre-Depends:'];
  let suggests = pkg['Suggests:'];
  let installedSize = pkg['Installed-size:'];
  let originalMaintainer = pkg['Original-Maintainer:'];

  if (depends) {
    dependencies = `Dependencies : ${depends}`;
  } else if (!depends && preDepends) {
    dependencies = `Pre-Dependencies : ${preDepends}`;
  }

  return (
    <div className="Clicked">
      <p className="Clicked-title">
          Click on the packages on the left column and display its details below
      </p>

      <div className={name ? `Clicked-package` : ``}>
        <h1>{name ? `Package Name : ${name}` : ``}</h1>
        <p>{description ? `Description : ${description}` : ``}</p>
        <p>{dependencies}</p>
        <p>{suggests ? `Suggests : ${suggests}` : ``}</p>
        <p>{installedSize ? `Installed-Size : ${installedSize}` : ``}</p>
        <p>{originalMaintainer ? `Original-Maintainer : ${installedSize}` : ``}
        </p>
      </div>
    </div>
  );
};

export default ClickedPackage;
