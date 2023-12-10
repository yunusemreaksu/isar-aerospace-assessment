import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

type Props = {
  openAlertDialog: boolean;
  setOpenAlertDialog: (openState: boolean) => void;
  handleActButtonClick: () => void;
};

export default function ActAlertDialog({
  openAlertDialog,
  setOpenAlertDialog,
  handleActButtonClick,
}: Props) {
  return (
    <AlertDialog.Root open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Caution!</AlertDialog.Title>
        <AlertDialog.Description size="3">
          Spectrum needs action! You should hit the Act on Spectrum button here
          now or on the info card later!
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              className="hover:cursor-pointer"
              onClick={() => setOpenAlertDialog(false)}
            >
              OK
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              className="hover:cursor-pointer"
              onClick={handleActButtonClick}
            >
              <ExclamationTriangleIcon /> Act on Spectrum
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
