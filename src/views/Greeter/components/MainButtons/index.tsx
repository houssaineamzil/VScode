/**
 * MainButtons component.
 */
import React from 'react';
import { createUseStyles } from 'react-jss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ButtonLink from '../../../../components/ButtonLink';
import GHButton, { GHButtonProps } from '../../../../components/GHButton';
import { ContactItem } from '../../../../models';
import { getGHCredentials } from '../../../../utils';
import styles from './styles';

const useStyles = createUseStyles(styles);

export interface MainButtonsProps {
  contactData: ContactItem[];
  repoUrl: string;
}

const MainButtons: React.FC<MainButtonsProps> = ({ contactData, repoUrl }) => {
  const classes = useStyles();

  const { repo, username } = getGHCredentials(repoUrl);

  const ghButtons: GHButtonProps[] = [
    // Follow button
    {
      resource: {
        endpoint: `https://api.github.com/users/${username}`,
        attr: 'followers',
      },
      href: `https://github.com/${username}`,
      title: `Ikuti @${username} di GitHub`,
      icon: ['fab', 'github'],
      size: 'lg',
      text: `Ikuti @${username}`,
    },
    // Stargazers button
    {
      resource: {
        endpoint: `https://api.github.com/repos/${username}/${repo}`,
        attr: 'stargazers_count',
      },
      href: repoUrl,
      title: `Bintang ${username}/${repo} di GitHub`,
      icon: 'star',
      size: 'sm',
      text: 'Bintang',
    },
  ];

  const mainContact = contactData.find((c) => c.isMain) as ContactItem;

  return (
    <div className={classes.root}>
      <div>
        {ghButtons.map((btn) => (
          <GHButton key={`gh-btn-${btn.resource.attr}`} {...btn} />
        ))}
      </div>
      <div>
        <ButtonLink
          href={mainContact.url}
          title={`Temukan saya di ${mainContact.name}`}
          icon={mainContact.icon as IconProp}
          size="lg"
          text="Hubungi Saya"
        />
      </div>
    </div>
  );
};

export default MainButtons;
