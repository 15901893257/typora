

## 1.集中式和分布式

Git是分布式版本控制系统

### 1.1 集中式

集中式版本控制系统，版本库是集中存放在中央服务器的，而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本，然后开始干活，干完活了，再把自己的活推送给中央服务器。中央服务器就好比是一个图书馆，你要改一本书，必须先从图书馆借出来，然后回到家自己改，改完了，再放回图书馆。

集中式版本控制系统最大的毛病就是必须联网才能工作

### 1.2 分布式

分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

## 2.git 常用命令

```
/*
< > 内为须填的变量名 
[ ] 代表可选的配置名 
( ) 或
*/


// 配置
git config --global user.name           // 全局配置用户名
git config --global user.email          // 全局配置邮箱
git config -l                           // 查看当前配置
git config --global -l                  // 看全局配置

// 创建版本库
git init [directory]                    // 创建本地版本库，可指定版本库所在文件夹
git clone <repository> [directory]      // 克隆远程库，可指定版本库所在文件夹

//  状态查询
git status  [-s]                        // 查看项目的当前状态，-s只输出简略信息
git diff [--stat]                       // 比较未缓存（工作目录和暂存区）的改动,--stat输出简略信息
git diff --cached                       // 比较已缓存（暂存区和版本库）的改动
git diff HEAD                           // 比较已缓存和未缓存的所有改动

// 查看提交历史
git log [--oneline]                     // 查看提交历史，--oneline查看简介信息
git log --graph                         // 查看分支拓扑图
git log --graph --pretty=oneline --abbrev-commit      //查看分支合并情况
git reflog                              // 查看每一次命令记录

// 本地修改
git add  <directory/file>               // 添加指定文件/目录到暂存区
git add  -A                             // 添加所有修改(新文件(new)、被修改(modified)和被删除(deleted)文件)到暂存区
git add  -u                             // 暂存被修改(modified)和被删除(deleted)文件
git add .                               // 添加当前项目所有修改（新文件(new)和被修改(modified)文件）到暂存区

git commit  -m <"">                     // 将缓存区内容添加到仓库中,-m ""为添加备注
git commit -a -m <"">                   // 提交工作区与暂存区中的改动
git commit --amend                      // 更改最近一次提交的信息，之后会进入编辑器可以更改信息

git checkout .                          // 用暂缓区的文件替换工作区文件，会清除工作区未提交改动
git checkout -- <file>                  // 将暂缓区指定文件替换工作区文件，会清除工作区未提交改动
git checkout HEAD .                     // 用 HEAD 指向分支中的全部文件替换暂存区和以及工作区中的文件，会清除未提交改动

git reset HEAD                          // 取消已缓存的内容
git reset --hard HEAD^                  // 回退到上一次提交的版本,添加--hard，工作目录也会更新，如果用--soft，工作目录和stage都不变
git reset --hard <commitID>             // 回退到指定commitID的版本

git rm <file>                           // 从跟踪中删除该文件
git rm -f <file>                        // 从工作区和暂存区删除已缓存到暂存区的文件
git rm --cached <file>                  // 保留工作区只在暂存区中删除文件

// 远程库
git remote [-v]                         // 查看关联的远程库,-v是显示连接地址
git remote add <repoName> <repoPath>    // 关联到远程库
git remote rm <repoName>                // 删除远程库

git fetch [repoName]                    // 从远程库下载新分支与数据
git pull  [repoName]                    // git fetch + git merge
git pull --ff                           // git fetch + git merge --ff
gir pull --no-ff                        // git fetch + git merge --no-ff
git pull --commit                       // git fetch + git merge --commit
git pull --all                          // git fetch --all + git merge

git push  [repoName] [branchName]       // 推送某分支到远程库
git push -f                             // 强制推送
git push --set-upstream                 // 设置远程追踪分支后推送

// 分支管理
git branch [-r]                         // 查看本地分支，-r是查看远程分支
git branch -a                           // 查看本地和远程分支
git branch --merged(--no-merged)        // 查看已经（或尚未）与当前分支合并的分支
git show-branch                         // 查看分支的提交图

git branch <branchname>                 // 创建新分支
git checkout <branchname>               // 切换到新分支
git checkout -b <branch> [remoteRepo]   // 创建并切换到新分支，可以在本地创建和远程分支对应的分支
git checkout -f <branchname>            // 强制检出，丢失当前更改
git branch --set-upstream <branchname> <remoteRepo>
                                        // 建立本地分支和远程分支的关联
git branch -d(-D) <branchname>          // 删除分支，-D强制删除，可以删除未合并的改动

git merge <branchname>                  // 合并<branchname>到当前分支
git merge --no-ff -m “description” <branchname>         // --no-ff表示禁用Fast forward,会创建一个新的commit提交点

git rebase                              // 衍合，将分支树合成一条：提取分叉分支的不同，
                                        // 作为补丁从共同父结点开始合并到当前分支

// 标签
git tag                                 // 查看当前标签
git tag <tagname>                       // 添加轻量级标签
git tag -a <tagname> -m <"">            // 为最近一次提交添加带附注的标签（推荐）
git tag -a <tagname> <commitID>         // 后期加注标签
git tag -d <tagname>                    // 删除指定标签
git show <tagname>                      // 查看该标签所修改的内容
git push origin --tags                  // 推送标签到远程仓库

// 内部图形化git
gitk

```

## 3.git工作流程

一般工作流程如下：

- 克隆 Git 资源作为工作目录。
- 在克隆的资源上添加或修改文件。
- 如果其他人修改了，你可以更新资源。
- 在提交前查看修改。
- 提交修改。
- 在修改完成后，如果发现错误，可以撤回提交并再次修改并提交。

![git-process](/Users/dengquanliang/typora/meituan/git/Git.assets/git-process.png)

## 4.Git 工作区、暂存区和版本库

- **工作区：**就是你在电脑里能看到的目录。
- **暂存区：**英文叫stage, 或index。一般存放在 ".git目录下" 下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- **版本库：**工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。

下面这个图展示了工作区、版本库中的暂存区和版本库之间的关系：

![img](/Users/dengquanliang/typora/meituan/git/Git.assets/1352126739_7909.jpg)

![](/Users/dengquanliang/typora/meituan/git/Git.assets/d5a4f2c9-def7-4266-95db-eb008b8ea294.png)

### 4.1 版本回退

![687474703a2f2f6d61726b6c6f6461746f2e6769746875622e696f2f76697375616c2d6769742d67756964652f62617369632d75736167652e7376673f73616e6974697a653d74727565](Git.assets/687474703a2f2f6d61726b6c6f6461746f2e6769746875622e696f2f76697375616c2d6769742d67756964652f62617369632d75736167652e7376673f73616e6974697a653d74727565.svg)

上面的四条命令在工作目录、stage 缓存(也叫做索引)和 commit 历史之间复制文件。

- `git add files` 把工作目录中的文件加入 stage 缓存
- `git commit` 把 stage 缓存生成一次 commit，并加入 commit 历史
- `git reset -- files` 撤销最后一次 `git add files`，你也可以用 `git reset` 撤销所有 stage 缓存文件
- `git checkout -- files` 把文件从 stage 缓存复制到工作目录，用来丢弃本地修改

你可以用 `git reset -p`、`git checkout -p` 或 `git add -p` 进入交互模式，也可以跳过 stage 缓存直接从 commit历史取出文件或者直接提交代码。

![687474703a2f2f6d61726b6c6f6461746f2e6769746875622e696f2f76697375616c2d6769742d67756964652f62617369632d75736167652d322e7376673f73616e6974697a653d74727565](Git.assets/687474703a2f2f6d61726b6c6f6461746f2e6769746875622e696f2f76697375616c2d6769742d67756964652f62617369632d75736167652d322e7376673f73616e6974697a653d74727565.svg)

- `git commit -a `相当于运行 `git add` 把所有当前目录下的文件加入 stage 缓存再运行 `git commit`。
- `git commit files` 进行一次包含最后一次提交加上工作目录中文件快照的提交，并且文件被添加到 stage 缓存。
- `git checkout HEAD -- files` 回滚到复制最后一次提交。

**git reset**

```
git reset HEAD                          // 取消已缓存的内容
git reset --hard HEAD^                  // 回退到上一次提交的版本,添加--hard，工作目录也会更新，如果用--soft，工作目录和stage都不变
git reset --hard <commitID>             // 回退到指定commitID的版本
git log                                 // 查看提交日志
git reflog                              // 查看记录的每一次命令，可以用这个来查找commit id
```

### 4.2 撤销修改

```
git checkout .                          // 用暂缓区的文件替换工作区文件，会清除工作区未提交改动
git checkout -- <file>                  // 将暂缓区指定文件替换工作区文件，会清除工作区未提交改动
git checkout HEAD .                     // 用 HEAD 指向分支中的全部文件替换暂存区和以及工作区中的文件，会清除未提交改动
```

```
$ git checkout -- readme.txt
```

命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

**如果已经git add到了暂缓区，用命令`git reset HEAD <file>`可以把暂存区的修改撤销掉（unstage），重新放回工作区，再继续使用git checkout -- <file>  **

**注意区分git reset和git checkout -- <file>  的区别，前者是撤销暂缓区的修改，后者是撤销还没git add到暂缓区的修改,其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。**

## 5.详细

### 5.1 创建版本库：git init [directory]

**使用方法：**

使用当前目录作为Git仓库，我们只需使它初始化。

```
git init
```

该命令执行完后会在当前目录生成一个 .git 目录。

使用我们指定目录作为Git仓库。

```
git init newrepo
```

初始化后，会在 newrepo 目录下会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中。

如果当前目录下有几个文件想要纳入版本控制，需要先用 git add 命令告诉 Git 开始对这些文件进行跟踪，然后提交：

```
$ git add *.c
$ git add README
$ git commit -m '初始化项目版本'
```

以上命令将目录下以 .c 结尾及 README 文件提交到仓库中。

### 5.2 从远程库克隆：git clone <repository> [directory]	

可以采用不同的协议下载：

- git clone [git@github.com](mailto:git@github.com):heaven668/StudySystem.git          --SSH协议
- git clone git://github.com/heaven668/StudySystem.git        --GIT协议
- git clone https://github.com/heaven668/StudySystem.git      --HTTPS协议

我们使用 **git clone** 从现有 Git 仓库中拷贝项目（类似 **svn checkout**）。

克隆仓库的命令格式为：

```
git clone <repo>
```

如果我们需要克隆到指定的目录，可以使用以下命令格式：

```
git clone <repo> <directory>
```

**参数说明：**

- **repo:**Git 仓库。
- **directory:**本地目录。

比如，要克隆 Ruby 语言的 Git 代码仓库 Grit，可以用下面的命令：

```
$ git clone git://github.com/schacon/grit.git
```

执行该命令后，会在当前目录下创建一个名为grit的目录，其中包含一个 .git 的目录，用于保存下载下来的所有版本记录。

如果要自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字:

```
$ git clone git://github.com/schacon/grit.git mygrit
```

### 5.3 查看改动：git diff

git diff 命令显示已写入缓存与已修改但尚未写入缓存的改动的区别

- 尚未缓存的改动：**git diff**
- 查看已缓存的改动： **git diff --cached**
- 查看已缓存的与未缓存的所有改动：**git diff HEAD**
- 显示摘要而非整个 diff：**git diff --stat**

### 5.4 状态查询：git status [-s]

git status 以查看在你上次提交之后是否有修改。-s输出简略信息

### 5.5 暂存改动：git add

git add 命令可将该文件添加到缓存

### 5.6 提交改动：git commit

使用 git add 命令将想要快照的内容写入缓存区， 而执行 git commit 将缓存区内容添加到仓库中。

Git 为你的每一个提交都记录你的名字与电子邮箱地址，所以需要配置用户名和邮箱地址。

- 提交暂存区改动：**git commit -m "提交信息"**

  如果你没有设置 -m 选项，Git 会尝试为你打开一个编辑器以填写提交信息

- 修改提交信息：**git commit --amend**

- 可以用 -a 选项跳过git add：**git commit -a** 

### 5.7 删除：git rm

如果只是简单地从工作目录中手工删除文件，运行 **git status** 时就会在 **Changes not staged for commit** 的提示。

- 要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除，然后提交：**git rm **   
- 如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 **-f：git rm -f **  
- 如果把文件从暂存区域移除，但仍然希望保留在当前工作目录中，换句话说，仅是从跟踪清单中删除，使用 **--cached** 选项即可：**git rm --cached ** 
- 可以递归删除整个目录中的所有子目录和文件：**git rm –r \***

**先手动删除文件，然后使用git rm <file>和git add<file>效果是一样的**

如果删错了，可以使用git checkout -- <file>来恢复，`git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

### 5.8 移动/重命名：git mv

git mv 命令用于移动或重命名一个文件、目录、软连接。

### 5.9 查看提交记录：git log

- 查看简略记录：git log --oneline
- 倒序查看：git log --reverse
- 查看指定用户提交：git log --author
- git log --graph： 查看分支拓扑图
- git log --graph --pretty=oneline --abbrev-commit ：查看分支合并情况
- 指定日期可以用：--since，--before ，--until，--after：
  git log --oneline --before={3.weeks.ago} --after={2010-04-18} --no-merges

## 6.添加远程仓库

```
# 添加远程库，与远程库进行关联
$ git remote add origin https://github.com/15901893257/typora.git
# 推送到远程库
$ git push -u origin master
```

### 6.1 查看当前的远程库

要查看当前配置有哪些远程仓库，可以用命令：

```
git remote
```

**实例**

```
$ git remote
origin
$ git remote -v
origin    git@github.com:tianqixin/runoob-git-test.git (fetch)
origin    git@github.com:tianqixin/runoob-git-test.git (push)
```

执行时加上 -v 参数，你还可以看到每个别名的实际链接地址。

------

### 6.2 提取远程仓库

Git 有两个命令用来提取远程仓库的更新。

1、从远程仓库下载新分支与数据：

```
git fetch [alias]
```

该命令执行完后需要执行git merge 远程分支到你所在的分支。

2、从远端仓库提取数据并尝试合并到当前分支：

```
git merge [alias]/[branch]
```

该命令就是在执行 git fetch 之后紧接着执行 git merge 远程分支到你所在的任意分支。

假设你配置好了一个远程仓库，并且你想要提取更新的数据，你可以首先执行 **git fetch [alias]** 告诉 Git 去获取它有你没有的数据，然后你可以执行 **git merge [alias]/[branch]** 以将服务器上的任何更新（假设有人这时候推送到服务器了）合并到你的当前分支。

### 6.3 推送到远程仓库

推送你的新分支与数据到某个远端仓库命令:

```
git push [alias] [branch]
git push -u origin master(第一次提交加上 -u)
```

以上命令将你的 [branch] 分支推送成为 [alias] 远程仓库上的 [branch] 分支。

### 6.4 删除远程仓库

删除远程仓库你可以使用命令：

```
git remote rm [别名]
```

## 7.分支管理

### 7.1 创建与合并分支

```
// 分支管理
git branch [-r]                         // 查看本地分支，-r是查看远程分支
git branch -a                           // 查看本地和远程分支
git branch --merged(--no-merged)        // 查看已经（或尚未）与当前分支合并的分支
git show-branch                         // 查看分支的提交图

git branch <branchname>                 // 创建新分支
git checkout <branchname>               // 切换到新分支
git checkout -b <branch> [remoteRepo]   // 创建并切换到新分支，可以在本地创建和远程分支对应的分支
git checkout -f <branchname>            // 强制检出，丢失当前更改
git branch --set-upstream <branchname> <remoteRepo>
                                        // 建立本地分支和远程分支的关联
git branch -d(-D) <branchname>          // 删除分支，-D强制删除，可以删除未合并的改动

git merge <branchname>                  // 合并<branchname>到当前分支
git merge --no-ff -m “description” <branchname>         // --no-ff表示禁用Fast forward,会创建一个新的commit提交点
```

### 7.2 分支管理

通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，**Git就会在merge时生成一个新的commit**，这样，从分支历史上就可以看出分支信息。

```
git merge --no-ff -m “description” <branchname>         // --no-ff表示禁用Fast forward,会创建一个新的commit提交点
```

### 7.3 bug分支

修复bug时，可以用git stash把当前工作现场“储藏”起来，等以后恢复现场后继续工作（工作区的内容未git add 到暂缓区）

用git stash list查看保存的工作现场

工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

另一种方式是用`git stash pop`，恢复的同时把stash内容也删了

在master分支上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick <commit>`命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

### 7.4 多人协作

并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

- `master`分支是主分支，因此要时刻与远程同步；
- `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
- feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

**1 抓取分支**

多人协作时，大家都会往`master`和`dev`分支上推送各自的修改

创建远程`origin`的`dev`分支到本地，用这个命令创建本地`dev`分支

```
$ git checkout -b dev origin/dev
```

每次推送时最好先git pull一下，与远程保持一致

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

**小结**

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

### 7.5 Rebase

## 8.标签管理

如果你达到一个重要的阶段，并希望永远记住那个特别的提交快照，你可以使用 git tag 给它打上标签。

比如说，我们想为我们的 runoob 项目发布一个"1.0"版本。 我们可以用 git tag -a v1.0 命令给最新一次提交打上（HEAD）"v1.0"的标签。

-a 选项意为"创建一个带注解的标签"。 不用 -a 选项也可以执行的，但它不会记录这标签是啥时候打的，谁打的，也不会让你添加个标签的注解。 我推荐一直创建带注解的标签。

```
$ git tag -a v1.0 
$ git tag v0.9 <commitId>
$ git tag    //查看标签
v0.9
v1.0
```

注意，标签不是按时间顺序列出，而是按字母排序的。可以用`git show <tagname>`查看标签信息：

可以创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字：

```
$ git tag -a v0.1 -m "version 0.1 released" <commitId>
```

**注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。**

### 小结

- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

## 参考

1. [Git](https://km.sankuai.com/page/70503490)
2. https://www.runoob.com/git/git-workflow.html
3. https://www.runoob.com/w3cnote/git-guide.html
4. https://www.liaoxuefeng.com/wiki/896043488029600/897884457270432

