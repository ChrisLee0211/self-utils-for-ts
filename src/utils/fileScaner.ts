import * as fs from 'fs';
import * as path from 'path';

type beforeScanFn = (entry: string, type: 'beforeScan') => Promise<void>
type scanFn = (info: { fileName: string, content: string }, type: 'scaning') => Promise<void>
type afterScanFn = (files: FileNode[], type: 'afterScan') => Promise<void>
type HookFn = beforeScanFn | scanFn | afterScanFn

export type FileNode = {
    name: string
    isFolder: boolean
    path: string
}

class Scaner {
    entry: string = '';
    constructor(entry: string) {
        this.entry = entry;

    }
    fileNodes: FileNode[] = [];

    /**
     * 扫描一个路径下的所有文件夹并返回一个文件夹名称数组
     * @param path 扫描路径
     * @returns {Array}
     * @author chris lee
     * @Time 2022/04/09
     */
    async scanFolder(path: string): Promise<fs.Dirent[]> {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir(path, { withFileTypes: true }, (err, files) => {
                    if (!err) {
                        resolve(files);
                    } else {
                        reject(err);
                    }
                });
            } catch (e) {
                reject(e);
                console.error(e);
            }
        });
    }

    /**
     * 异步读取文件内容
     * @param path 文件路径
     * @param opts encoding：返回内容编码类型，默认为null，即为buffer
     * @param opts flag: 文件系统标志
     * @returns {Buffer}
     * @author chrislee
     * @Time 2022/04/09
     */
    async readFileContent(path: string, opt?: { encoding: BufferEncoding, flag?: string }): Promise<Buffer | string> {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(path, opt, (err, data) => {
                    if (!err) {
                        resolve(data);
                    }
                });
            } catch (e) {
                reject(e);
                console.error(e);
            }
        });
    }

    /**
     * 判断一个文件是否已经在当前目录下存在
     * @param path 文件路径
     * @author chris lee
     * @Time 2022/04/09
     */
    async checkFileIsBuilt(path: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                fs.access(path, fs.constants.F_OK, (err) => {
                    if (!err) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
    }

    /**
    * 根据路径返回模块名称
    * @param path 路径
    * @returns {string}
    * @author chris lee
    * @Time 2022/04/09
    */
    private getModuleName(filePath: string): string {
        const reg = /^(index)(\.).*$/;
        const baseName = path.basename(filePath);
        const splitPath = filePath.split(path.sep);
        if (baseName.match(reg) && splitPath.length > 1) {
            return `${splitPath[splitPath.length - 2]}${path.sep}${baseName}`;
        } else {
            return splitPath[splitPath.length - 1];
        }
    }

    private async flushEffectCb(cb: Function | Function[], ...args: any[]) {
        if (typeof cb === 'function') {
            await cb(...args)
        } else {
            for (let i = 0, len = cb.length; i++;) {
                await cb[i](...args)
            }
        }
    }

    async scan(effect: HookFn | HookFn[]) {
        const stack = [];
        try {
            await this.flushEffectCb(effect, this.entry, 'beforeScan')
        } catch (e) {
            console.error(e);
        };
        try {
            const files = await this.scanFolder(this.entry);
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    const isFolder = files[i].isDirectory();
                    const name = files[i].name;
                    const filePath = path.resolve(this.entry, files[i].name);
                    const curNode: FileNode = {
                        name, isFolder, path: filePath,
                    };
                    stack.push(curNode);
                    this.fileNodes.push(curNode);
                }
            }
            // DFS
            while (stack.length) {
                const currentFileNode = stack.pop() as FileNode;
                if (currentFileNode.isFolder) {
                    const files = await this.scanFolder(currentFileNode.path);
                    if (files.length) {
                        for (let i = 0; i < files.length; i++) {
                            const isFolder = files[i].isDirectory();
                            const filePath = path.resolve(currentFileNode.path, files[i].name);
                            const name = this.getModuleName(filePath);
                            const curNode: FileNode = {
                                name,
                                isFolder,
                                path: filePath,
                            };
                            stack.push(curNode);
                        }
                    }
                } else {
                    try {
                        const content = await this.readFileContent(currentFileNode.path, { encoding: 'utf-8' }) as string;
                        await this.flushEffectCb(effect,{ fileName: currentFileNode.path, content }, 'scaning' )
                    } catch (e) {
                        console.error(e);
                    }
                    this.fileNodes.push(currentFileNode);

                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            await this.flushEffectCb(effect,this.fileNodes.slice(), 'afterScan')
        }

    }

}


export default Scaner