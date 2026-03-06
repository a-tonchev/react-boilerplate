import { UserCircleIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from '@/components/ui/tabs';

import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[800px] mx-auto py-8 px-4 sm:px-6">
      <h2 className="text-xl font-bold text-foreground mb-6 tracking-tight">
        {t('profile')}
      </h2>
      <div className="rounded-xl border overflow-hidden">
        <Tabs defaultValue="profile">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4 h-13">
            <TabsTrigger
              value="profile"
              className={[
                'gap-2 data-[state=active]:shadow-none',
                'data-[state=active]:border-b-[3px]',
                'data-[state=active]:border-secondary rounded-none',
              ].join(' ')}
            >
              <UserCircleIcon size={18} weight="regular" />
              {t('editProfile')}
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className={[
                'gap-2 data-[state=active]:shadow-none',
                'data-[state=active]:border-b-[3px]',
                'data-[state=active]:border-secondary rounded-none',
              ].join(' ')}
            >
              <ShieldCheckIcon size={18} weight="regular" />
              {t('Security')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="py-8 px-4 sm:px-8">
            <EditProfile />
          </TabsContent>
          <TabsContent value="security" className="py-8 px-4 sm:px-8">
            <UpdatePassword />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
