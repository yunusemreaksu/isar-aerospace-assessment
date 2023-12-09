import { AlertDialog, Button, Flex } from "@radix-ui/themes";

type Props = {
  openAlerDialog: boolean;
  setOpenAlertDialog: (openState: boolean) => void;
};

export default function ActAlertDialog({
  openAlerDialog,
  setOpenAlertDialog,
}: Props) {
  return (
    <AlertDialog.Root open={openAlerDialog} onOpenChange={setOpenAlertDialog}>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Caution!</AlertDialog.Title>
        <AlertDialog.Description size="3">
          Spectrum needs action! You should hit the Act on Spectrum button!
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
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
