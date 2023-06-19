import Express from 'express';
type RequestAuthValidator = (req: Express.Request, res: Express.Response) => boolean;

interface OrizuruConfig {
	reqAuthValidator?: RequestAuthValidator;
}
export { OrizuruConfig }