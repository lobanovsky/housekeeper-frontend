import { useCallback } from "react";
import { AccessService, KeyVO } from "backend/services/backend";
import { useLoading } from "hooks/use-loading";
import { showError } from "utils/notifications";

export function useAccessItemCRUD({ accessId, onFinish = undefined }: { accessId: number, onFinish?: () => void }) {
  const [isDeleting, setDeleting, hideDeleting] = useLoading();
  const [isSaving, setSaving, hideSaving] = useLoading();

  const deleteAccessItem = useCallback(() => {
    setDeleting();
    AccessService.deleteAccess({ accessId: accessId > 0 ? accessId : 0 })
      .then(() => {
        hideDeleting();
        if (onFinish) {
          onFinish();
        }
      })
      .catch(e => {
        showError("Не получилось удалить доступ", e);
        hideDeleting();
      });
  }, [accessId, onFinish]);

  const saveAccessItem = useCallback((newValues: KeyVO) => {

  }, [accessId, onFinish]);

  return { isDeleting, isSaving, deleteAccessItem, saveAccessItem };
}