import { HttpErrorResponse } from "@angular/common/http";

export class HandleErrorResponse {
    public static showError(httpErrorResponse: HttpErrorResponse): string {
        let errorMessage: string;
        switch (httpErrorResponse.status) {
            case 500:
                errorMessage = 'Imternal Server Error';
                break;
            case 404:
                errorMessage = 'Reocrd  Not Found';
                break;
            default:
                errorMessage = 'Service not available. Please try again';

        }
        return errorMessage;
    }
}