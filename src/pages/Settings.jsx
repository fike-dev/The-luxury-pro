import Heading from "../ui/Heading";
import useSettings from "../features/settings/useSettings";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Spinner from "../ui/Spinner";

function Settings() {
  const { isLoading, settings } = useSettings();

  if (isLoading) return <Spinner />;
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>;
      <UpdateSettingsForm settings={settings} />
    </Row>
  );
}

export default Settings;
